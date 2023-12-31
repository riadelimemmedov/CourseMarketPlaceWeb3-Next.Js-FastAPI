//!React and Next.js
import useSWR from "swr"
import { usePathname } from 'next/navigation'
import { useEffect } from "react"


//!Helpers methods and function
import {loadContractData} from "@utils/contract/loadContractData"
import { normalizeOwnedCourse } from "@utils/normalize"


//?handler
export const handler = (web3,contract) => (courses,account) => {
    const pathname = usePathname()

    const swrRes = useSWR(()=>
        (web3 && contract && account.data) ? `web3/ownedCourses/${account.data}/`:null,
        async () => {
            const ownedCourses = []
            for(let i=0; i<courses.length; i++){
                const course = courses[i]

                if(!course.id) {continue}

                const hexCourseId = web3.utils.padRight(web3.utils.utf8ToHex(course.id.toString()), 32);

                const courseHash = web3.utils.soliditySha3(
                    { type: "bytes16", value: hexCourseId},
                    { type: "address", value: account.data }
                ) 

                const contract_data = await loadContractData()

                const ownedCourse = await contract_data.contract.methods.getCourseByHash(courseHash).call()
                // const a = await contract_data.contract.methods.getCourseByHash("0xa3d6c602e6a4c1bb7aabfd9a12ecec388e1af52f9eb7e00761642b574661fc41").call()
                
                if(ownedCourse.owner != "0x0000000000000000000000000000000000000000"){
                    const normalized = normalizeOwnedCourse(web3)(course,ownedCourse)
                    ownedCourses.push(normalized)
                }
            }
            console.log('Owned corusee resultt for purchasee ', ownedCourses)
            return ownedCourses
        }
    )

    useEffect(() => {
        if (pathname === '/marketplace/courses/owned') {
            swrRes.mutate(); // Trigger revalidation of SWR data
        }
    }, [swrRes]);

    return swrRes
}