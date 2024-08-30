// function fetchData() {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve("Data from API");
//         console.log("Data is fetching");
//       }, 3000);
//     });
//   }
  
//   function processData(data) {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(`Processed: ${data}`);
//       }, 2000);
//     });
//   }
  
//   // Using Promises
//   fetchData()
//     .then((data) => {
//       return processData(data);
//     })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
  

// function fetchData() {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve("Data from API");
//       }, 1000);
//     });
//   }
  
//   function processData(data) {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(`Processed: ${data}`);
//       }, 1000);
//     });
//   }
  
//   // Using async/await
//   const main = async () => {
//     try {
//       const data = await fetchData(); // Wait for data to be fetched
//       const result = await processData(data); // Wait for data to be processed
//       console.log(result); // Log the result
//     } catch (error) {
//       console.error("Error:", error); // Handle errors
//     }
//   };
  
//   main();
  


const video = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Sitanshu");
        resolve(10); // Resolve the promise with a value
      }, 5000);
    });
  };
  
  const audio = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Mishra");
        resolve(); // Resolve the promise (no value)
      }, 3000);
    });
  };

const main = async () => {
    try {
        const video1 = await video()
        const audio1 = await audio()
        console.log(`Sitanshu : ${video1} and audio : ${audio1}`);
        
    } catch (error) {
        console.log("Error: ",error);
        throw error
    }
}

main()

// const video = () => {
//     setTimeout(()=>{console.log("Sitanshu");
//     },10000)
// }
// const audio = () => {
//     setTimeout(() => {
//         console.log("mishra");
//     }, 2000);
// }

// video()
// audio()