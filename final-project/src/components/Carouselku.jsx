import React, {Component} from 'react'
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators} from 'reactstrap'

const items = [
    {
        src: '//cdn.shopify.com/s/files/1/0029/3981/3988/files/Last_Day_-_Web_Banner_1920x800.jpg?v=1572931022',
        altText: 'MaretMantap',
        caption: 'MaretMantap'
    },
    {
        src: '//cdn.shopify.com/s/files/1/0029/3981/3988/files/web_banner_1920x800.jpg?v=1572580195',
        altText: 'MaretMantap',
        caption: 'MaretMantap'
    },
    {
        src: '//cdn.shopify.com/s/files/1/0029/3981/3988/files/Web_Banner_1_eb712236-a97c-4998-9f43-516ad4e7fdf1_1920x800.jpg?v=1572595000',
        altText: 'MaretMantap',
        caption: 'MaretMantap'
    }
]

class Carouselku extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }
    
    onExited() {
        this.animating = false;
    }

    next() {
        if(this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if(this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if(this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;
    
        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img src={item.src} alt={item.altText} height='100%' width='100%'/>
                </CarouselItem>
            );
        });
    
        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
}

export default Carouselku