<template>
    <div id="app">
        <transition mode="out-in" name="bounce">
            <router-view />
        </transition>
        <!-- <transition mode="out-in" name="slide-fade">
            <router-view />
        </transition> -->
    </div>
</template>
<style lang="scss">
.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}

@keyframes bounceInLeft {

    from,
    60%,
    75%,
    90%,
    to {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
        opacity: 0;
        -webkit-transform: translate3d(-3000px, 0, 0);
        transform: translate3d(-3000px, 0, 0);
    }

    60% {
        opacity: 1;
        -webkit-transform: translate3d(25px, 0, 0);
        transform: translate3d(25px, 0, 0);
    }

    75% {
        -webkit-transform: translate3d(-10px, 0, 0);
        transform: translate3d(-10px, 0, 0);
    }

    90% {
        -webkit-transform: translate3d(5px, 0, 0);
        transform: translate3d(5px, 0, 0);
    }

    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

.bounce-enter-active {
    animation: bounceInLeft .5s;
}

.bounceInLeft {
    -webkit-animation-name: bounceInLeft;
    animation-name: bounceInLeft;
}
</style>