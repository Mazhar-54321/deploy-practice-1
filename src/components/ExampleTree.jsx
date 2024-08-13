import React, { useState } from 'react';
import SouthIcon from '@mui/icons-material/South';
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
              padding: '8px',
              minWidth: '170px',
              textAlign: 'center',
              border: '2px solid rgba(0, 0, 0, 1)',
              display: 'inline-block',
              position: 'relative',
              backgroundColor: '#fff',
              borderRadius:'10px',
              fontSize:'12px',
              fontWeight:'bold',
              opacity:'0.6'
            }}
          >
            {item}
          </li>

          {index < data.length - 1 && (
            <div
              style={{
                height: '25px',
                margin: '0 auto',
              }}
            >
              <SouthIcon />
              </div>
          )}
        </React.Fragment>
      ))}
        
      </ul>
    </div>
  );
};

export default ExampleTree;
