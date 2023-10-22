import { fromEvent,interval } from "rxjs";
import { ajax } from 'rxjs/ajax';
const url = 'http://localhost:3000/messages/unread'
const message$ = interval(3000)
message$.subscribe(()=>{
const messages = ajax.getJSON(url);
messages.subscribe(
(response) => {
  if (response.status === 'ok'){
    let listmessages = [...document.querySelectorAll('.msg')];
    let msg = response.messages.sort((a, b) => {
      return Date.parse(a.received) - Date.parse(b.received)
    })
    msg.forEach(item => {
      let shortSubject = item.subject
  if(item.subject.length >=15){
    shortSubject = `${item.subject.slice(0,14)}...`
  }

      if(!listmessages.find(el => el.dataset.id === item.id)){
        document.querySelector('.messages').insertAdjacentHTML('afterbegin',`<li class="msg" data-id=${item.id}>
        <div class="msg_email content">${item.from}</div>
        <div class="msg_subject content">${shortSubject}</div>
        <div class="msg_time content">${new Date(item.received).toLocaleString("ru-RU", {
          hour: "numeric",
          minute: "numeric",
        })}, ${new Date(item.received).toLocaleString("ru-RU", {
           year: "numeric",
          month: "numeric",
          day: "numeric",
        })}</div>
      </li>`)
      }
    })

    
  }
}
)
})
