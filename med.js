
<script>
// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = () => {
  let header = document.querySelector('header')	
  let containsClass = header.classList.contains('scrolled')
  if (document.documentElement.scrollTop > 200 && !containsClass) {
     header.classList.add("scrolled" );
  } 
  else if (document.documentElement.scrollTop < 50 && containsClass){
      header.classList.remove("scrolled");
  }
}
</script>

