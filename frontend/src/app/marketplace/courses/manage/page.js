"use client"

//!Custom components
import { BaseLayout } from "@components/ui/layout"
import { Header } from "@components/ui/marketplace"
import { CourseFilter, OwnedCourseCard } from "@components/ui/course"
import { Button } from "@components/ui/common"


//*ManageCourses
export default function ManageCourses () {
        //return jsx to client
        return (
            <>
                <BaseLayout>
                    <div className="py-4">
                        <Header/>
                        <CourseFilter/>
                    </div>
                    <section className="grid grid-cols-1">
                        {/*
                        <OwnedCourseCard>
                                <div className="flex mr-2 relative rounded-md">
                                    <input
                                        type="text"
                                        name="account"
                                        id="account"
                                        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                                        placeholder="0x2341ab..." />
                                    <Button>
                                        Verify
                                    </Button>
                                </div>
                            </OwnedCourseCard>
                        */}
                    </section>
                </BaseLayout>
            </>
        )
}