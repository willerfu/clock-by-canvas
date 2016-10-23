/**
 * canvas绘制时钟插件
 *
 * @author willerfu
 * @date 2016/10/23
 *
 */

!(function($, window, document, undefined) {

	// 定义CLOCK构造函数
	var Clock = function(elem, ctx, opts) {
			this.$element = elem, this.context = ctx,
			// 默认参数
			this.defaults = {
				hCol: '#000',
				// 时针颜色
				mCol: '#999',
				// 时针颜色
				sCol: 'red',
				// 时针颜色
				isNumCol: '#000',
				// 数字所在的点颜色
				noNumCol: '#ccc',
				// 非数字所在的点颜色
				dCol: '#fff',
			}, this.options = $.extend({}, this.defaults, opts);
		};

	// CLOCK原型方法
	Clock.prototype = {
		drawBackground: function(_ctx, r, rem, isNumCol, noNumCol) {
			_ctx.save();
			_ctx.translate(r, r); // 调整原点位置
			_ctx.beginPath();
			_ctx.lineWidth = 10 * rem;
			_ctx.arc(0, 0, r - _ctx.lineWidth / 2, 0, 2 * Math.PI, false);
			_ctx.stroke();

			// 绘制数字
			var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
			_ctx.font = 18 * rem + 'px Arial'; // 字体大小
			_ctx.textAlign = 'center';
			_ctx.textBaseline = 'middle';

			hourNumbers.forEach(function(number, i) {
				var rad = 2 * Math.PI / 12 * i;
				var x = Math.cos(rad) * (r - 30 * rem);
				var y = Math.sin(rad) * (r - 30 * rem);
				_ctx.fillText(number, x, y);
			});

			// 绘制数字周围的点
			for (var i = 0; i < 60; i++) {
				var rad = 2 * Math.PI / 60 * i;
				var x = Math.cos(rad) * (r - 16 * rem);
				var y = Math.sin(rad) * (r - 16 * rem);
				_ctx.beginPath();
				// 数字所在的点颜色
				if (i % 5 == 0) {
					_ctx.fillStyle = isNumCol;
					_ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
				} else { // 非数字所在的点颜色
					_ctx.fillStyle = noNumCol;
					_ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
				}
				_ctx.fill();
			}
		},
		drawHour: function(_ctx, r, rem, hour, minute, hCol) {
			var radH = 2 * Math.PI / 12 * hour; // hours小时后的弧度
			var radM = 2 * Math.PI / 12 / 60 * minute; // minuts分钟后的弧度
			_ctx.save();
			_ctx.beginPath();
			_ctx.rotate(radH + radM); // 时钟旋转的弧度
			_ctx.strokeStyle = hCol;
			_ctx.lineWidth = 6 * rem;
			_ctx.lineCap = "round";
			_ctx.moveTo(0, 10 * rem);
			_ctx.lineTo(0, -r / 2);
			_ctx.stroke();
			_ctx.restore();
		},
		drawMinute: function(_ctx, r, rem, minute, mCol) {
			var rad = 2 * Math.PI / 60 * minute;
			_ctx.save();
			_ctx.beginPath();
			_ctx.rotate(rad);
			_ctx.strokeStyle = mCol;
			_ctx.lineWidth = 3 * rem;
			_ctx.lineCap = "round";
			_ctx.moveTo(0, 10 * rem);
			_ctx.lineTo(0, -r + 25 * rem);
			_ctx.stroke();
			_ctx.restore();
		},
		drawSecond: function(_ctx, r, rem, second, sCol) {
			var rad = 2 * Math.PI / 60 * second;
			_ctx.save();
			_ctx.beginPath();
			_ctx.rotate(rad);
			_ctx.fillStyle = sCol;
			_ctx.moveTo(-2 * rem, 20 * rem);
			_ctx.lineTo(2 * rem, 20 * rem);
			_ctx.lineTo(1, -r + 20 * rem);
			_ctx.lineTo(-1, -r + 20 * rem);
			_ctx.fill();
			_ctx.restore();
		},
		drawDot: function(_ctx, r, rem, dCol) {
			_ctx.beginPath();
			_ctx.fillStyle = dCol;
			_ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
			_ctx.fill();
		},
		draw: function() {
			var width = this.$element.width(),
				height = this.$element.height(),
				_ctx = this.context,
				r = width / 2,
				rem = width / 200,
				isNumCol = this.options.isNumCol,
				noNumCol = this.options.noNumCol,
				hCol = this.options.hCol,
				mCol = this.options.mCol,
				sCol = this.options.sCol,
				dCol = this.options.mCol;

			var date = new Date(),
				hour = date.getHours(),
				minute = date.getMinutes(),
				second = date.getSeconds();

			_ctx.clearRect(0, 0, width, height); // 清空内容
			this.drawBackground(_ctx, r, rem, isNumCol, noNumCol);
			this.drawHour(_ctx, r, rem, hour, minute, hCol);
			this.drawMinute(_ctx, r, rem, minute, mCol);
			this.drawSecond(_ctx, r, rem, second, sCol);
			this.drawDot(_ctx, r, rem, dCol);
			_ctx.restore();
		}
	};
	// 插件中使用Clock对象
	$.fn.drawClock = function(options) {
		var _self = this;
		// 获取canvas上下文环境
		var ctx = this.get(0).getContext('2d');

		setInterval(function() {
			// 创建Clock的实体
			var clock = new Clock(_self, ctx, options);
			clock.draw();
		}, 1000);
	};
})(jQuery, window, document);