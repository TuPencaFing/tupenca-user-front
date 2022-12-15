export const setBodyText = (color) => {
    document.documentElement.style.color = color;
    document.body.style.color = color;
    document.getElementById('root').style.color = color;
};

export const setBodyBackground = (color) => {
    document.documentElement.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
    document.getElementById('root').style.backgroundColor = color;
};

export const setBannerText = (color) => {
    if (document.getElementsByClassName('navbar')[0] !== undefined) {
        document.getElementsByClassName('navbar')[0]
            .style
            .setProperty('color', color, 'important');
    }
    // document.getElementsByClassName('navbar')[0]
    //     .getElementsByClassName('logout-button')[0]
    //     .style
    //     .setProperty('color', color, 'important');
};

export const setBannerBackground = (color) => {
    if (document.getElementsByClassName('navbar')[0] !== undefined) {
        document.getElementsByClassName('navbar')[0]
            .style
            .setProperty('background-color', color, 'important');
    }
};
