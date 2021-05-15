<template>
    <section>
        <!-- Blur dialog bg and allow dialog to close by clicking bg -->
        <div class="blur-bg" @click="closeDialog"></div>

        <!-- Crerate dialog to edit posts-->
        <dialog open>
            <form @submit.prevent="">
                <div class="form-control title-container" >
                    <label for="post-title">Title</label>
                    <input name="post-title" type="text" v-model="newTitle" />
                </div>
                <div>
                    <textarea 
                    class="form-text form-control" 
                    rows="3" 
                    v-model.trim="newMessage" />
                </div>
                <div>
                    <button class="btn btn-primary m-2" @click="saveEdit">Save</button>
                    <button class="btn btn-primary m-2" @click="closeDialog">Close</button>
                </div>
            </form>
        </dialog>
    </section>


</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
    },
    emits: ['delete', 'save-edit', 'close-dialog'],
    name: 'EditDialog',
    data() {
        return {
            isEditing: true,
            newTitle: this.title,
            newMessage: this.message
        }
    },
    methods: {
        saveEdit() {
            this.$emit('save-edit',this.id, this.newTitle, this.newMessage)
        },
        closeDialog() {
            this.$emit('close-dialog');
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* DIALOG BG */

.blur-bg {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

/* DIALOG */

dialog {
  position: fixed;
  top: 20vh;
  left: 30%;
  width: 40%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
}

</style>
