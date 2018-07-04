


<script>
    import html2canvas from 'html2canvas'
    export default {

        filters: {},
        directives: {},
        components: {

        },
        data () {
            return {
              text:''
            }
        },
        mounted () {

        },
        beforeDestroy () {


        },
        methods: {
          sure() {

            let imgData;
            let type = 'jpg';

            let canvas = document.createElement("canvas"),
              w = document.querySelector('.content').offsetWidth,
              h = document.querySelector('.content').offsetHeight;

            canvas.width = w * 2;
            canvas.height = h * 2;
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";

            let context = canvas.getContext("2d");
            context.scale(2, 2);
            html2canvas(document.querySelector('.content'), {
              allowTaint: false,
              taintTest: true,
              canvas: canvas,
              width: w,
              height: h
            }).then(function (canvas) {
              canvas.id = "mycanvas";
              canvas.style.display = 'none';
              document.body.appendChild(canvas);
              imgData = canvas.toDataURL(type);


              let _fixType = function (type) {
                type = type.toLowerCase().replace(/jpg/i, 'jpeg');
                let r = type.match(/png|jpeg|bmp|gif/)[0];
                return 'image/' + r;
              };
              // 加工image data，替换mime type
              imgData = imgData.replace(_fixType(type), 'image/octet-stream');

              var saveFile = function (data, filename) {
                var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                save_link.href = data;
                save_link.download = filename;

                var event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                save_link.dispatchEvent(event);
              };

              var filename = '家里有矿啊.' + type;
              saveFile(imgData, filename);
            })
          }

        }

    }
</script>
<style lang="less">

</style>


