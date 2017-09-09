var smartgrid = require( 'smart-grid' );

var settings = {
    filename: '_smart-grid',
    outputStyle: 'sass',
    columns: 18,
    offset: "20px",
    container: {
        maxWidth: "1200px"
    },
    breakPoints: {
        md: {
            width: "1024px",
            fields: "15px"
        },
        sm: {
            width: "768px",
            fields: "15px"
        },
        xs: {
            width: "414px",
            fields: "15px"
        },
        xxs: {
            width: "360px",
            fields: "10px"
        }
    }
};
smartgrid( './app/sass/precss', settings );