export function attachDomFixedPosSideListener(parentSelector, DomListener, callback) {
    return setInterval(() => {
        const parent = document.querySelector(parentSelector),
              dom = parent ? parent.querySelector(DomListener) : null;
        if ( dom !== null && parent !== null ) {            
            let   clientRect = parent.getBoundingClientRect(),
                X = clientRect.x,
                Y = clientRect.y,
                dom_height = dom.clientHeight,
                dom_width = dom.clientWidth,
                top_distance = Y - dom_height,
                left_distance = X - dom_width,
                top = Y - dom_height + parent.clientHeight,
                left = X - dom_width - 20;           
            if ( top_distance < 0 ) {
                top = Y;
            }
            if ( left_distance < 0 ) {
                left = X + parent.clientWidth + 20;
            }
            if ( dom.style.getPropertyValue('position') !== 'fixed' ) {
                dom.style.setProperty('position', 'fixed', 'important');
            }           
            if ( parseInt( dom.style.getPropertyValue('top') ) !== parseInt(top) ) {
                dom.style.setProperty('top', top + 'px', 'important');
            }
            if ( parseInt( dom.style.getPropertyValue('left') ) !== parseInt(left) ) {
                dom.style.setProperty('left', left + 'px', 'important');
            }
            if ( callback ) {
                callback();
            }            
        }    
    }, 10);
}
export function attachDomFixedPosBelowListenerInPopbox(element, domBelowSelectorListener, callback) {
    return setInterval(() => {
        try {
            const elementDom = document.querySelector(element),
                elemenSearchFDom = elementDom.nextElementSibling,
                dom = document.querySelector(domBelowSelectorListener);
            if ( elementDom !== null && dom !== null ) {            
                let clientRect = elementDom.getBoundingClientRect(),
                    X = clientRect.x,
                    Y = clientRect.y,
                    sfelement_height = elemenSearchFDom ? elemenSearchFDom.clientHeight : 0,
                    element_height = elementDom.clientHeight,
                    element_width = elementDom.clientWidth,            
                    top = Y + element_height + sfelement_height,
                    left = X,
                    width = element_width;
                const isOverBelowScreen = top + dom.clientHeight > window.innerHeight;
                if ( dom.style.getPropertyValue('position') !== 'fixed' ) {
                    dom.style.setProperty('position', 'fixed', 'important');
                }           
                if ( parseInt( dom.style.getPropertyValue('top') ) !== parseInt(top) ) {                    
                    if ( !isOverBelowScreen ) {   
                        dom.style.setProperty('top', top + 'px', 'important');
                        if ( elemenSearchFDom && elemenSearchFDom.style.getPropertyValue('top') !== '' ) {
                            elemenSearchFDom.style.setProperty('top', '', 'important');
                        }
                    }
                    else {
                        dom.style.setProperty('top', (Y - dom.clientHeight - sfelement_height) + 'px', 'important');
                        const elementSearchTop = Y - sfelement_height;
                        if ( elemenSearchFDom && elemenSearchFDom.style.getPropertyValue('top') !== elementSearchTop ) {
                            elemenSearchFDom.style.setProperty('top', elementSearchTop + 'px', 'important');
                        }
                        /*if ( elemenSearchFDom ) {
                            elemenSearchFDom.setAttribute('style', `position: fixed; top: ${Y - sfelement_height}px; z-index: 10; width: ${width}px`);
                        }*/
                    }
                }
                if ( parseInt( dom.style.getPropertyValue('left') ) !== parseInt(left) ) {
                    dom.style.setProperty('left', left + 'px', 'important');
                }
                if ( parseInt( dom.style.getPropertyValue('width') ) !== parseInt(width) ) {
                    dom.style.setProperty('width', width + 'px', 'important');
                }
                //
                if ( elemenSearchFDom && isOverBelowScreen ) {
                    if ( elemenSearchFDom.style.getPropertyValue('position') !== 'fixed' ) {
                        elemenSearchFDom.style.setProperty('position', 'fixed', 'important');
                    }      
                    if ( parseInt( elemenSearchFDom.style.getPropertyValue('width') ) !== parseInt(width) ) {
                        elemenSearchFDom.style.setProperty('width', width + 'px', 'important');                    
                    }
                    if ( !elemenSearchFDom.classList.contains('__hvi') ) {
                        elemenSearchFDom.classList.add('__hvi');
                    }      
                }
                if ( callback ) {
                    callback();
                }            
            }    
        } catch {
            
        }
    }, 10);
}