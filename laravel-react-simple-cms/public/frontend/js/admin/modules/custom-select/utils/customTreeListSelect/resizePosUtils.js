export function resizePos(pageY) {
    const { className } = this.props,
        container = document.querySelector('.option-custom.' + className),
        ul = container.querySelector('.select-list'),              
        offsetLeft = container.offsetLeft,           
        width = container.clientWidth;       
    ul.style.left = offsetLeft - width + 20 + 'px';
    ul.style.top = pageY - ul.clientHeight + 'px';      
}