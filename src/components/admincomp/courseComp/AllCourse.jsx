import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Book02Icon, BookOpen02Icon, Clock01Icon } from 'hugeicons-react'
import React from 'react'

function AllCourse({data, setSelected}) {
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
      {data.map((item, i) =>{
        return (
          <Card  key={i} className='  overflow-hidden pt-0 hover:shadow-lg shadow transition-all duration-300'>
            <CardHeader className='relative  py-4 border-b'>
              <CardTitle className='capitalize'>{item.name?.toLowerCase()}</CardTitle>
              <CardDescription>Category : <span className='text-foreground capitalize'>{item?.category?.toLowerCase()}</span></CardDescription>
              <div className='absolute top-4 right-5'>
                <BookOpen02Icon size={20} strokeWidth={1} className='text-muted-foreground'/>
              </div>
            </CardHeader>
              <CardContent>
                <div className='flex flex-col '>
                  <div className='flex items-center gap-2'>
                    <span className='flex items-center gap-1 text-sm '>
                      <Clock01Icon size={16}/>
                      Duration :
                    </span>
                    <h1 className=' font-medium'> {item.duration}</h1>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='flex items-center gap-1 text-sm '>
                      <Book02Icon size={16}/>
                      Subjects :
                    </span>
                    <h1 className=' font-medium'> {item?.subjects?.length} Subjects</h1>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button  className='w-full rounded-full' onClick={() => setSelected(item)}>Show Batches</Button>
              </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

export default AllCourse
