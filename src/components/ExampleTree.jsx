import React, { useState } from 'react';

const ExampleTree = () => {
    const [data]=useState(['Miya huzoor','khwaja Usman Miya','Shah Muhammad Hasan','Shah Inayat Hussain','Muhammad Nabi raza','Shah Abdul Hayy',
        'Muqlis ur Rahman Jhangir','Shah Imdad Ali','Shah Muhammad Mehdi','Mazhar Hussain',
        'Farhat ullah Ifteqar','Hasan Ali Shah hasan','Shah Mun`am','Khaleel ur Rahman','Meer syed jafar',
        'Meer ahle sufa','Nizam uddin','Taqi uddin','Naseer Uddin','Syed Mahmood','Syed Meer',
        'Shah Qutb uddin','Shaikh Najm Uddin','Shahab Uddin','Sarkar Gause paak',"Abul hasan",'Aby Yusuf',
        'Abdul azeez','Abu bakr shibli','hazrat Junaid','Siri saqti','Maroof karqi','Moosa raza','Moosa kazam',
        'Jafar','Baqar','Hazrat Ali'
    ])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      

      <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {data?.map((item, index) => (
        <React.Fragment key={index}>
          <li
            style={{
              padding: '10px',
              minWidth: '200px',
              textAlign: 'center',
              border: '2px solid #333',
              display: 'inline-block',
              position: 'relative',
              backgroundColor: '#fff',
              borderRadius:'5px'
            }}
          >
            {item}
          </li>

          {/* Render the vertical line, but only if it's not the last item */}
          {index < data.length - 1 && (
            <div
              style={{
                width: '2px',
                height: '20px',
                backgroundColor: '#333',
                margin: '0 auto',
              }}
            />
          )}
        </React.Fragment>
      ))}
        
      </ul>
    </div>
  );
};

export default ExampleTree;
