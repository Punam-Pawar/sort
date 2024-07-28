// import React, { useState } from 'react'

// function BubbleSort() {
//     const [arr,setArr]=useState([]);
//     function add_Element(){
//       var num = parseInt(document.getElementById("numInput").value);


//       document.getElementById("numInput").value="";
//       setArr([...arr,num]);
      

//     }
//     function Sort_elements(){
//      let ar=arr;
//       for(let i=0;i<ar.length;i++){
//         for(let j=0;j<ar.length;j++){
//           if(ar[i]<ar[j]){
//             let t=ar[i];
//             ar[i]=ar[j];
//             ar[j]=t;
//           }
//         }
        
//       }
//       setArr(ar);
//       setArr([...arr]);

//     }

//   return (
//     <div>
//         <table>
//           <tr>
//             {arr.map((arr,index)=><td key={index}>{arr}</td>)}
//           </tr>
//         </table>
//         <input type="text" id="numInput" placeholder='Enter Element to add'></input>
//         <button onClick={add_Element}>Add</button>
//         <button onClick={Sort_elements}>Sort</button>
//     </div>
//   )
// }

// export default BubbleSort



import React, { useState, useEffect } from 'react';

function BubbleSort() {
    const [arr, setArr] = useState([]);
    const [sortedIndices, setSortedIndices] = useState([]);
    const [activeIndices, setActiveIndices] = useState([]);
    const [sorting, setSorting] = useState(false);
    const [i, setI] = useState(0);
    const [j, setJ] = useState(0);

    function add_Element() {
        var num = parseInt(document.getElementById("numInput").value);
        document.getElementById("numInput").value = "";
        setArr([...arr, num]);
    }

    useEffect(() => {
        if (sorting) {
            let ar = [...arr];
            const sortedIndicesTemp = [...sortedIndices];
            const interval = setInterval(() => {
                if (i < ar.length) {
                    if (j < ar.length - i - 1) {
                        setActiveIndices([j, j + 1]);
                        if (ar[j] > ar[j + 1]) {
                            let t = ar[j];
                            ar[j] = ar[j + 1];
                            ar[j + 1] = t;
                            setArr([...ar]);
                        }
                        setJ(j + 1);
                    } else {
                        sortedIndicesTemp.push(ar.length - i - 1);
                        setSortedIndices([...sortedIndicesTemp]);
                        setActiveIndices([]);
                        setJ(0);
                        setI(i + 1);
                    }
                } else {
                    sortedIndicesTemp.push(0); // Mark the first element as sorted at the end
                    setSortedIndices([...sortedIndicesTemp]);
                    setActiveIndices([]);
                    setSorting(false);
                    clearInterval(interval);
                }
            }, 500); // Adjust the interval for slower/faster animation

            return () => clearInterval(interval);
        }
    }, [sorting, arr, i, j]);

    function Sort_elements() {
        setSortedIndices([]);
        setActiveIndices([]);
        setI(0);
        setJ(0);
        setSorting(true);
    }

    return (
        <div>
            <div className="sort-container">
                {arr.map((value, index) => (
                    <div
                        key={index}
                        className={`sort-bar ${sortedIndices.includes(index) ? 'sorted' : ''} ${activeIndices.includes(index) ? 'active' : ''}`}
                    >
                        {value}
                    </div>
                ))}
            </div>
            <input type="text" id="numInput" placeholder="Enter Element to add"></input>
            <div className="button-container">
                <button onClick={add_Element} id="add">Add</button>
                <button onClick={Sort_elements} disabled={sorting} id="sort">Sort</button>
            </div>
        </div>
    );
}

export default BubbleSort;

