<script>
  import Header from "./Header.svelte";
  import Main from "./Main.svelte";
  import Footer from "./Footer.svelte";
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  }
</style>

<div class="container">
  <Header />
  <Main />
  <Footer />
</div>

<!-- https://jsfiddle.net/RMarsh/bzuasLcz/3/
https://www.google.com/search?q=svelte+with+firebase&oq=svelte+with+firebase+&aqs=chrome..69i57j0l2.9316j1j7&client=ms-unknown&sourceid=chrome-mobile&ie=UTF-8
https://fireship.io/lessons/svelte-v3-overview-firebase/
https://medium.com/javascript-in-plain-english/looking-into-svelte-3-b3d0b43cd794
https://svelte.dev/docs#svelte_store
https://svelte.dev/
https://tobiasahlin.com/blog/layered-smooth-box-shadows/
https://svelte.dev/examples#hello-world
https://madewithsvelte.com/?page=5
https://madewithsvelte.com/svelte-notifications
https://madewithsvelte.com/svelte-table
https://github.com/dasDaniel/svelte-table/blob/master/example/App.svelte -->
