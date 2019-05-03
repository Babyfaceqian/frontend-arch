# zrender demo
[zrender官方链接](https://ecomfe.github.io/zrender-doc/public/)
## 类继承关系
- 元素类（`Circle`等）继承`Displayable`类
`Displayable`类 继承`Element`类
- 容器类（`Group`) 继承`Element`类
- `Element`类 继承`Animatable`、 `Transformable`、 `Eventful`基础类
## 组件封装
封装组件Graph
1. 将初始化的`zr`实例作为`Graph`的属性
2. `Graph`拥有自己的属性和方法
3. 对外开放`Graph`和`zr`的属性和方法
## 支持功能
- [x] 支持鼠标事件，可在元素上绑定事件，因为元素类继承事件类
- [x] 属性初始化及更新支持，参考`zrender.Displayable`类
- [x] 元素可拖拽，参考`zrender.Displayable`类
- [x] 容器，参考`zrender.Group`类
- [x] 所有元素（容器也算元素）都可缩放变换，参考`zrender.Transformable`类
- [x] 所有元素都可添加动画，参考`zrender.Animatable`类
- [x] 元素可添加文字并设置文字属性
- [x] 更改元素属性自动刷新画布，也可手动立即刷新
- [ ] ……
## 已实现的需求
1. node、link的添加与删除（结构基于研判的node、link）
2. node、link的选中与高亮
3. 画布的缩放和拖拽
4. 选择框功能
5. 相关动画
6. node大小、link粗细不随缩放变换

## 注意事项
1. 元素的`position`属性和`shape.cx`属性都是相对于局部坐标系，即当前元素（或同步变换group）变换（平移缩放）后的坐标系，可以通过该元素（或同步变换group）的`transformCoordToGlobal(x,y)`方法获取全局坐标系。
2. 画布拖拽与选框是通过监听`zr`实例`mousedown`、`mousemove`、`mouseup`实现，画布缩放是通过监听`zr`实例`mousewheel`实现，相比较添加元素的方法较为简便（Group容器无法监听这些鼠标事件）。官方宣称，会有Enhancement。
3. 元素的点击事件会冒泡到`zr`实例，可以在外面监听点击事件获取该元素进行相关操作。
## 问题
1. 根据鼠标位置设置缩放原点存在问题