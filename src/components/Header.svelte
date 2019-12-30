<script>
  import { authState } from "rxfire/auth";
  import { auth } from "../store/firebase.js";
  import { user } from "../store/store.js";

  let loginUser = {
    email: "john.doe@flbk.dev",
    password: "hallo123456"
  };

  const unsubscriber = authState(auth).subscribe(remoteUser =>
    user.set(remoteUser)
  );

  function login() {
    auth.signInWithEmailAndPassword(loginUser.email, loginUser.password);
  }

  function logout() {
    auth.signOut();
  }
</script>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 4px 8px;
    background: lightsteelblue;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.2),
      0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.1),
      0 16px 16px rgba(0, 0, 0, 0.05);
  }

  header > h2 {
    letter-spacing: 0.1em;
  }

  .header-ctrl {
    padding: 8px;
    margin-right: 4px;
    background: inherit;
    border: 1px solid steelblue;
    border-radius: 4px;
    font-size: medium;
    outline: none;
  }

  .header-ctrl:hover,
  .header-ctrl:focus {
    border: 2px solid steelblue;
  }

  .header-ctrl_button {
    text-transform: uppercase;
    cursor: pointer;
  }
</style>

<header>
  <h2>Scoreboard</h2>
  <div>
    <input
      bind:value={loginUser.email}
      class="header-ctrl"
      type="text"
      placeholder="enter your email" />
    <input
      bind:value={loginUser.password}
      class="header-ctrl"
      type="password"
      placeholder="enter your password" />
    <button class="header-ctrl header-ctrl_button" on:click={login}>
      login
    </button>
    <button class="header-ctrl header-ctrl_button" on:click={logout}>
      logout
    </button>
  </div>
</header>
