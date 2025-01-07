var items = ['Vacuum the carpet', 'Sweep', 'Wash the dishes'];

var list = document.querySelector('#myList');

items.forEach(function(item) {
  
    
});


list.addEventListener('click', function(item) {

    if(item.target.tagName='li') {
        item.target.classList.toggle('checked');
    }

});


document.querySelector('#btnCreate').onclick=function() {


    var item = document.querySelector('#txtItem').value;

    CreateItem(item);
};

function CreateItem(item){
    var li = document.createElement('li');
    var t = document.createTextNode(item);
    li.className='list-group-item';
    li.appendChild(t);
    list.appendChild(li);


    var span = document.createElement('span');
    var text = document.createTextNode('\u00D7');
    span.className="close";
    span.appendChild(text);
    li.appendChild(span);

    span.onclick = function(){
        var li = this.parentElement;
        li.style.display="none";
    }
}
function editTask(element) {
    const taskText = element.parentElement.querySelector('.task-text');
    const newText = prompt('Edit task:', taskText.textContent);
    if (newText !== null) {
      taskText.textContent = newText;
    }
  };

  function deleteTask(element) {
    if (confirm('Silmek istediğinizden eminmisin?')) {
      element.parentElement.remove();
    }
  };
  