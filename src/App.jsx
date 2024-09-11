import { useState } from 'react'
import './App.css'

function App() {

  const houseDetails = [
    {
      Flat : "Flat - A",
      SubMeter : "Sub-Meter-1",      
    },
    {
      Flat : "Flat - B",
      SubMeter : "Sub-Meter-2",      
    },
    {
      Flat : "Flat - D",
      SubMeter : "Sub-Meter-5",      
    },
    {
      Flat : "Flat - F",
      SubMeter : "Sub-Meter-7",      
    }    
  ]


  const [total, setTotal] = useState([])
  const [units, setUnits] = useState([])
  const [cr, setCr] = useState(0)
  const [lr, setLr] = useState(0)

  const calculateTotal = (unitsToCalc) =>{
    const electricityDuty = unitsToCalc * 0.06;
    const fppcaCharges = unitsToCalc * 1.2;
    let customerCharges = 0;
    const fixedCharges = 50;

  if(unitsToCalc<=30)
    {
      customerCharges = 25;
      return(unitsToCalc * 1.90 + customerCharges + fixedCharges + fppcaCharges + electricityDuty);
    }
    else if(unitsToCalc<=75)
    {
      customerCharges = 30;
      let basic = 30*1.90;
      return(basic + ((unitsToCalc-30) * 3)  + customerCharges + fixedCharges + fppcaCharges + electricityDuty);
    }
    else if(unitsToCalc<=125)
    {
      customerCharges = 45;
      let basic = (30*1.90) + ((75-30)*3);
      return(basic + ((unitsToCalc-75) * 4.5)  + customerCharges + fixedCharges + fppcaCharges + electricityDuty);
    }
    else if(unitsToCalc<=225)
    {
      customerCharges = 50;
      let basic = (30*1.90) + ((75-30)*3) + ((125-75)*4.5);
      return(basic + ((unitsToCalc-125) * 6)  + customerCharges + fixedCharges + fppcaCharges + electricityDuty);
    }
    else if(unitsToCalc<=400)
    {
      customerCharges = 55;
      let basic = (30*1.90) + ((75-30)*3) + ((125-75)*4.5) + ((225-125)*6);
      return(basic + ((unitsToCalc-225) * 8.75) + customerCharges + fixedCharges + fppcaCharges + electricityDuty);
    }
    else if(unitsToCalc>400)
    {
      customerCharges = 55;
      let basic = (30*1.90) + ((75-30)*3) + ((125-75)*4.5) + ((225-125)*6) + ((400-225) * 8.75);
      return(basic + ((unitsToCalc-400) * 9.75) + customerCharges + fixedCharges + fppcaCharges + electricityDuty);
    }
    else 
    return("You don't have to pay")
  }
 
  const unitSet = (e, index) =>{
   const tempUnits = [...units]
   tempUnits[index] = Number(e.target.value)
   setUnits(tempUnits)
  }

  const calculateBill = (index) => {
    let newTotal = [...total];
    newTotal[index] = Math.round(calculateTotal(units[index]));
    setTotal(newTotal);    
  }

  return (
    <>
      <div className=' flex justify-around bg-gray-800'>
        <h1 className='text-3xl text-white p-3'>Electricity Bill</h1>
      </div>

      <div className='mt-5'>

        {
          houseDetails && houseDetails.length && houseDetails.map((house, ind)=>(
            
            <span key={ind}  className='flex items-center justify-evenly border-b-2 py-2'>
              <p>{house.Flat} & {house.SubMeter}</p>
              <input placeholder='Units' onChange={(e)=>unitSet(e, ind)} className='p-2 border-solid border-2 border-black mx-4'/>
              <button className='py-2 px-8 border-black border-2 ' onClick={()=>{calculateBill(ind)}}>Calculate</button>
              <p className='w-24 border-2 border-black'>{total[ind] || 0}</p>              
            </span>
          ))
        }

        
      </div> 

      <div className='flex items-center justify-center gap-5 mt-10'>
        <span>Calculator</span>
        <input placeholder='Current Month' onChange={(e)=>setCr(e.target.value)} className='border-2 p-2 border-black' />
        <p>-</p>
        <input placeholder='Last Month' onChange={(e)=>setLr(e.target.value)} className='border-2 p-2 border-black' />        
      </div>

      <p className='flex justify-center mt-10 p-4 border-2 border-black'>Difference = {cr - lr}</p>
    </>
  )
}

export default App
