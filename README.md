#Canvas绘制钟表插件 clock-plug-in 
使用html5中Canvas技术，绘制钟表表盘，表面大小支持自适应。

### 参数：

```
{
	hCol: 'xxx',// 时针颜色
	mCol: 'xxx', // 时针颜色
	sCol: 'xxx', // 时针颜色
	isNumCol: 'xxx', // 数字所在的点颜色
	noNumCol: 'xxx', // 非数字所在的点颜色
	dCol: 'xxx', // 中心圈颜色
}
```
用户可以根据需要自定义参数值，更改表盘的颜色样式

### 使用
在需要生成的目标html文件中，写入 canvas 标签，画布大小可根据需要自定义，由于表盘是圆形，所以画布宽高应该设置相等，不然画出的表盘会变形。

#####html代码：
```
<div class="box">
		<canvas id="clock" width="500" height="500"></canvas>
</div>
```
##### js代码：

```
<script type="text/javascript">
	$(function() {
		$("#clock").drawClock(
			//{
				// hCol: 'xxx',// 时针颜色
				// mCol: 'xxx', // 时针颜色
				// sCol: 'xxx', // 时针颜色
				// isNumCol: 'xxx', // 数字所在的点颜色
				// noNumCol: 'xxx', // 非数字所在的点颜色
				// dCol: 'xxx', // 中心圈颜色
			//}
		);
	})
</script>
```
**注意：** 写入以上代码前，html文件需要依次引入jQuery文件，和钟表插件js文件，保持html代码中的canvas的ID和jquery中获取的对象ID相同，示例中的元素ID为 *clock*

```
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/clock-canvas.min.js"></script>
```






