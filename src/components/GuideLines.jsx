import React, { useEffect, useState } from 'react';

const guidelines = {
    'course':['To add course : course name , course description,course image, course category,course fees is required',
        'You can add class data at the time of course creation or later',
        'To add a class  class date,video link,files are required',

    ],
    'student':['To add student : student email is required',
        'You can give access to courses ',
        'You can delete a student',

    ]
}
export default function GuideLines({type}) {

    const getLayout = ()=>{
        return ( <ol>{guidelines[type].map(e=><li style={{fontSize:'12px',fontWeight:'bold',marginBottom:'5px'}}>{e}</li>)}</ol>)
    }
    return(<>
     {getLayout()}
    </>)
}