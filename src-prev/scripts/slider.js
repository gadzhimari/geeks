import Config from '../config';

export function handleControl(e) {
    let direction = e.currentTarget.dataset.control;
    let slides = this.state.slides.sort(this.sortByOrder);

    let currentIndex = +document.querySelector('.slide.active').dataset.index;
    document.querySelector('.slide.active').classList.remove('active');

    let newIndex = 0;

    if (direction === 'next') {
        newIndex = currentIndex + 1;
    } else {
        newIndex = currentIndex - 1;
    }

    setControlImage(direction);
    setControlBtn(newIndex, slides);
    changeDot(newIndex);

    let color = false;
    if (slides[newIndex].black_text_color) {
        color = 'black';
    }

    changeHeaderColor(color);
}

export function changeHeaderColor(color) {
    let isHome = document.querySelector('.home');

    if (isHome) {
        document.querySelector('.home .link-home').addEventListener('click', (event) => {
            event.preventDefault();
        });
    }

    document.querySelector('#root').classList = '';
    if (color) {
        document.querySelector('#root').classList.add(color);
    }
}

export function setControlImage(direction) {
    const timeout = 1500;
    const controlImage = document.querySelector('.image-' + direction);

    controlImage.classList.remove('deactive');
    controlImage.classList.add('active');

    setTimeout(() => {
        controlImage.classList.remove('active');
        controlImage.classList.add('deactive');
    }, timeout);
}

export function setControlBtn(index, slides) {

    // NEXT
    if (slides.length !== (index + 1)) {
        document.querySelector('.control-next').classList.remove('hidden');
        document.querySelector('.control-next').classList.add('hide');

        document.querySelector('.control-next .control-image').style.backgroundImage = `url(${Config.host + slides[index + 1].image_thumbnail.url})`;

        setTimeout(() => {
            document.querySelector('.image-next').style.backgroundImage = `url(${Config.host + slides[index + 1].image_thumbnail.url})`;
        }, 1500);

        setTimeout(() => {
            document.querySelector('.control-next').classList.remove('hide');
        }, 600);

    } else {
        document.querySelector('.control-next').classList.add('hidden');
    }

    // PREV
    if (index - 1 >= 0) {
        document.querySelector('.control-prev').classList.remove('hidden');
        document.querySelector('.control-prev').classList.add('hide');

        document.querySelector('.control-prev .control-image').style.backgroundImage = `url(${Config.host + slides[index - 1].image_thumbnail.url})`;


        setTimeout(() => {
            document.querySelector('.image-prev').style.backgroundImage = `url(${Config.host + slides[index - 1].image_thumbnail.url})`;
        }, 1500);

        setTimeout(() => {
            document.querySelector('.control-prev').classList.remove('hide');
        }, 600);
    } else {
        document.querySelector('.control-prev').classList.add('hidden');
    }

    document.querySelector('.slide-' + index).classList.add('active');
}

window.onresize = function (event) {
    changeVideoDimension();
};

export function changeVideoDimension() {
    if (window.innerWidth < 1300) {
        document.querySelectorAll('.slide-video video').forEach((element) => {
            element.classList.add('video-vertical');
        });
    } else {
        document.querySelectorAll('.slide-video video').forEach((element) => {
            element.classList.remove('video-vertical');
        });
    }
}

export function setDotNavigation() {
    const triggers = document.querySelectorAll('.slider-switch');
    const triggersWrap = document.querySelector('.dots--wrap');
    const highlight = document.createElement('span');

    highlight.classList.add('highlight', 'hide');
    document.querySelector('#root').append(highlight);

    function highlightLink() {
        const linkCoords = this.getBoundingClientRect();
        const coords = {
            width: linkCoords.width,
            height: linkCoords.height,
            top: linkCoords.top + window.scrollY,
            left: linkCoords.left + window.scrollX,
        }
        highlight.style.width = `${coords.width}px`;
        highlight.style.height = `${coords.height}px`;
        highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;

        document.querySelector('.highlight').classList.remove('hide');
    }
    triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));

    function disableHighlight() {
        const linkItemActive = document.querySelector('.slider-switch.active').getBoundingClientRect();
        const linkItem = document.querySelector('.slider-switch').getBoundingClientRect();

        const coords = {
            width: linkItem.width,
            height: linkItem.height,
            top: linkItemActive.top + window.scrollY,
            left: linkItemActive.left + window.scrollX,
        }
        highlight.style.width = `${coords.width}px`;
        highlight.style.height = `${coords.height}px`;
        highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;

        document.querySelector('.highlight').classList.add('hide');
    }
    triggersWrap.addEventListener('mouseleave', disableHighlight);

    disableHighlight();

    let slidetDots = document.querySelectorAll('.slider-switch');
    slidetDots.forEach((element) => {
        element.addEventListener('mouseenter', () => {

            slidetDots.forEach((current) => {
                current.classList.remove('hover');
            });

            element.classList.add('hover');
        });

        element.addEventListener('mouseleave', () => {

            slidetDots.forEach((current) => {
                current.classList.remove('hover');
            });

            document.querySelector('.slider-switch.active').classList.add('hover');
        });
    });
}

export function changeDot(index) {
    document.querySelector('.slide-' + index).classList.add('active');

    document.querySelectorAll('.slider-switch').forEach((element) => {
        if (element.dataset !== index) {
            element.classList.remove('active', 'hover');
        }
    });

    document.querySelectorAll('.slider-switch')[index].classList.add('active', 'hover');
}


export function sliderSwitch(e) {
    let index = e.currentTarget.dataset.index;
    let currentIndex = document.querySelector('.slider--wrap .active').dataset.index;

    document.querySelectorAll('.slide').forEach((element) => {
        if (element.dataset !== index) {
            element.classList.remove('active');
        }
    });

    document.querySelector('.slide-' + index).classList.add('active');

    changeDot(index);

    let direction = 'prev'
    if (index > currentIndex) {
        direction = 'next';
    }

    let color = false;
    if (this.state.slides[index].black_text_color) {
        color = 'black';
    }

    document.querySelectorAll('.shadow-image').forEach((element) => {
        element.classList.add('disable');
    });

    changeHeaderColor(color);
    setControlImage(direction);
    setControlBtn(+index, this.state.slides);

    setTimeout(() => {
        document.querySelectorAll('.shadow-image').forEach((element) => {
            element.classList.remove('disable');
        });
    }, 1500);
}
