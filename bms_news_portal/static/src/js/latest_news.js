/** @odoo-module **/

import publicWidget from '@web/legacy/js/public/public_widget';

publicWidget.registry.portalLatestNews = publicWidget.Widget.extend({
    selector: '#portal-latest-news',
    events: {
        'click .btn-prev': 'onClickBtnPrev',
        'click .btn-next': 'onClickBtnNext',
    },

    init() {
        this._super.apply(this, arguments)
        this.currentIndex = 1
        this.maxIndex = 7
        const slides = $('.preview-blog-list')[0]
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
        setInterval(this.onClickBtnNext.bind(this), 5000)
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
        $('.preview-blog-list').css({
            transition: 'transform 0.5s ease',
            transform: `translateX(-${100 * this.currentIndex}%)`
        })
    }
})