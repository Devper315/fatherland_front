/** @odoo-module **/

import publicWidget from '@web/legacy/js/public/public_widget';

publicWidget.registry.portalVotingProduct = publicWidget.Widget.extend({
    selector: '#fatherland-front-voting-product',
    events: {
        'click .btn-prev': 'onClickBtnPrev',
        'click .btn-next': 'onClickBtnNext',
    },

    init() {
        this._super.apply(this, arguments)
        this.currentIndex = 1
        this.maxIndex = 4
        const slides = $('.voting-product-list')[0]
        slides.addEventListener("transitionend", () => {
            if (this.currentIndex === this.maxIndex) {
                slides.style.transition = "none";
                this.currentIndex = 1;
                slides.style.transform = `translateX(-${100 * this.currentIndex}%)`;
            } else if (this.currentIndex === 0) {
                slides.style.transition = "none";
                this.currentIndex = this.maxIndex - 1;
                slides.style.transform = `translateX(-${100 * this.currentIndex}%)`;
            }
        })
        setInterval(this.onClickBtnNext.bind(this), 6000)
    },

    onClickBtnPrev() {
        if (this.currentIndex === 0) return
        this.currentIndex--
        this.processSlideTransition()
    },

    onClickBtnNext() {
        if (this.currentIndex === this.maxIndex) return
        this.currentIndex++
        this.processSlideTransition()
    },


    processSlideTransition() {
        $('.voting-product-list').css({
            transition: 'transform 0.8s ease',
            transform: `translateX(-${100 * this.currentIndex}%)`
        })
    },

})