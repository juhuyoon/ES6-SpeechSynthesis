const msg = new SpeechSynthesisUtterance(); //what is the person going to say
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

    msg.text = document.querySelector(`[name = "text"]`).value; //to connect to textarea 
    function populateVoices(){ //to give you voice choices
      voices = this.getVoices(); //https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices
      //console.log(voices);
      const voiceOptions = voices
                          //.filter(voice => voice.lang.includes('en')) if you want only english versions.
                            .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join('');
      voicesDropdown.innerHTML = voiceOptions 
    }


 function setVoice(){
   //console.log(this.value);
   msg.voice = voices.find(voice => voice.name === this.value);
   toggle();
 }

 function toggle(startOver = true) {
   speechSynthesis.cancel();
    if(startOver){
      speechSynthesis.speak(msg);
    }
 }

 function setOption() {
   console.log(this.name, this.value);
   msg[this.name] = this.value;
   toggle();

 }

  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', toggle);
  stopButton.addEventListener('click', () => toggle(false)); //creating another function to pass argument of false, popular in react. 
