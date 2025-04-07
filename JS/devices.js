//Folder for recognizing devices
console.log("Devices javascript plugin active");

const isMobile = navigator.userAgentData.mobile;
if(isMobile){
   console.log("Currently on mobile");
}
else{
    console.log("Currently on desktop");
}

console.log(isMobile);