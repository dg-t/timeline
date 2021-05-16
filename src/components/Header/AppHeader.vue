<template>
    <!-- Header -->
    <header class="container-fluid text-center separator">
        <h1 class="p-4">Organize your time</h1>
        <div class="pb-4 hide-text">
            <p>This timeline works on localehost.</p>
            <p>If some modifications are made in the App.vue file, 
                the timeline will connect to a firebase realtime database, and CRUD oerations can be performed using axios.
            </p>
        </div>
    </header>
</template>

<script>
export default {
    name: 'AppHeader'
}
</script>

<!-- 2 Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/** HEADER */

.separator:after {
  display: block;
  background-color: #fdce5c;
  content: " ";
  height: 2px;
  width: 70%;
  margin: 0 auto;
  bottom: 0;
  margin-bottom: 30px;
}

/** MEDIA QUERY */

@media only screen and (max-width: 767px)  {

  /* TIMELINE SECTION */

    .hide-text {
        display: none;
    }
}

</style>
