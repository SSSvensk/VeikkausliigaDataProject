<template>
  <div>
    <div>
      {{ msg }}
    </div>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      exampleArray: []
    }
  }
}
</script>