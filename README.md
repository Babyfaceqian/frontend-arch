# zrender demo
## 类继承关系
元素类（Circle等）继承Displayable类，继承Element类，继承Animatable、 Transformable、 Eventful基础类
## 功能
[x] 鼠标事件支持，可在元素上绑定事件，因为元素类继承事件类
[x] 样式初始化及更新支持，参考zrender.Displayable类
[x] 元素可拖拽，参考zrender.Displayable类
[x] 容器，参考zrender.Group类
[x] 所有元素（容器也算元素）都可缩放变换，参考zrender.Transformable类
[x] 所有元素都可添加动画，参考zrender.Animatable类
[x] 元素可添加文字并设置文字属性
## 需求
1. node、link配置
2. node、link添加与更新
3. node结构与目前业务结构保持一致