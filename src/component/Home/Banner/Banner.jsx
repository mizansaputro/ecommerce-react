import React, {Fragment} from "react";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


const Banner = () => {
    const fadeImages = [
        {
          url: 'https://wallpaperaccess.com/full/1437673.jpg',
          caption: 'Slide 1'
        },
        {
          url: 'https://assets.materialup.com/uploads/2a7967d5-171b-427d-ba3f-97740ec2c72e/attachment.png',
          caption: 'Slide 2'
        },
        {
          url: 'https://www.thistlesstirling.com/wp-content/uploads/2016/08/BW5869-Thistles-Winter-Fashion-Web-Banner-1920x1080px.jpg',
          caption: 'Slide 3'
        },
    ];
    return (
        <Fragment>
            <div className="banner-container">
                <Fade>
                    {fadeImages.map((fadeImage, index) => (
                        <div className="each-fade" key={index}>
                            <div className="image-container">
                                <img src={fadeImage.url} alt={fadeImage.caption} />
                            </div>
                        </div>
                    ))}
                </Fade>
            </div>
        </Fragment>
      )
}
export default Banner;