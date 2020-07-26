<template>
  <div>
    <div>
      {{ msg }}
    </div>
    <div>
      {{ testData }}
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
      exampleArray: [],
      testData: 3
    }
  },
  methods: {
    test() {
      return 2
    },
    parameterTest(arr) {
      return arr.reverse()
    }
  }
}
</script>