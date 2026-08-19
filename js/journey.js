(function ($) {
    "use strict";

    /* =====================================================================
       JOIN OUR JOURNEY — IMAGES
       -------------------------------------------------------------------
       Apni photos add karne ke 2 tarike hain:

       1) (Recommended) Apni image files "img/journey/" folder me daal do,
          aur neeche list me uska filename likh do. Example:
              { src: "img/journey/journey-1.jpg", caption: "Gurgaon Facility" }

       2) Jab tak photo nahi daali, us slot ka "src" khali ("") rehne do —
          wahan ek placeholder box dikhega jisse pata chale ki yahan photo
          add karni hai.

       Jitni entries neeche list me hongi, utni hi images slider aur
       "View More" gallery dono me dikhengi. Order wahi rahega jo yahan hai.
    ===================================================================== */
    const journeyImages = [
        { src: "img/journey/journey-1.webp", caption: "Raw Material - Whey Protein Concentrate" },
        { src: "img/journey/journey-2.webp", caption: "Our Manufacturing Facility" },
        { src: "img/journey/journey-3.webp", caption: "Manufacturing Facility Campus" },
        { src: "img/journey/journey-4.webp", caption: "Quality Control Lab" },
        { src: "img/journey/journey-5.webp", caption: "Instrument Room" },
        { src: "img/journey/journey-6.webp", caption: "Sponsoring Fitness Champions" },
        { src: "img/journey/journey-7.webp", caption: "Our Team at Work" },
        { src: "img/journey/journey-8.webp", caption: "Testing Lab" },
        { src: "img/journey/journey-9.webp", caption: "Advanced Lab Equipment" },
        { src: "img/journey/journey-10.webp", caption: "Stability Storage Chambers" },
        { src: "img/journey/journey-11.webp", caption: "Community Outreach" },
        { src: "img/journey/journey-12.webp", caption: "Community Awareness Event" },
        { src: "img/journey/journey-13.webp", caption: "Our Team" },
        { src: "img/journey/journey-14.webp", caption: "On the Ground" },
        { src: "img/journey/journey-15.webp", caption: "Celebrating Our Athletes" },
        { src: "img/journey/journey-16.webp", caption: "At the Fitness Expo" },
    ];

    /* =====================================================================
       JOIN OUR JOURNEY — VIDEOS
       -------------------------------------------------------------------
       Apni video add karne ke liye:
       1) Video file "video/journey/" folder me daal do (.mp4 recommended).
       2) (Optional) Ek poster/thumbnail image "img/journey/" me daal do.
       3) Neeche list me ek naya line add karo:
              { src: "video/journey/apni-video.mp4", poster: "img/journey/apna-thumb.webp", caption: "Caption yahan likho" }
       Poster na ho to bhi chalega — bas "poster: """ rakh dena.
    ===================================================================== */
    const journeyVideos = [
        { src: "video/journey/journey-video-1.mp4", poster: "img/journey/journey-video-1-poster.webp", caption: "Inside Our Warehouse" },
        { src: "video/journey/journey-video-2.mp4", poster: "img/journey/journey-video-2-poster.webp", caption: "Our Facility Campus" },
        { src: "video/journey/journey-video-3.mp4", poster: "img/journey/journey-video-3-poster.webp", caption: "A Word From Our Team" }
    ];

    function buildTile(image, index) {
        const altText = image.caption && image.caption !== "Add your photo"
            ? image.caption
            : "DN Healthcare journey photo " + (index + 1);

        if (image.src) {
            return (
                '<div class="journey-item">' +
                    '<img loading="lazy" src="' + image.src + '" alt="' + altText + '">' +
                '</div>'
            );
        }

        return (
            '<div class="journey-item">' +
                '<div class="journey-placeholder">' +
                    '<i class="fa fa-camera"></i>' +
                    '<span>' + (image.caption || "Add your photo") + '</span>' +
                '</div>' +
            '</div>'
        );
    }

    function buildVideoCard(video) {
        const posterAttr = video.poster ? ' poster="' + video.poster + '"' : '';
        return (
            '<div class="col-6 col-md-4 col-lg-3">' +
                '<div class="journey-video-card">' +
                    '<video controls preload="metadata"' + posterAttr + '>' +
                        '<source src="' + video.src + '" type="video/mp4">' +
                        'Your browser does not support the video tag.' +
                    '</video>' +
                    (video.caption ? '<div class="journey-video-caption">' + video.caption + '</div>' : '') +
                '</div>' +
            '</div>'
        );
    }

    function renderJourney() {
        const $slider = $("#journeySlider");
        const $grid = $("#journeyGalleryGrid");
        const $videoGrid = $("#journeyVideoGrid");

        if (!$slider.length) {
            return;
        }

        journeyImages.forEach(function (image, index) {
            $slider.append(buildTile(image, index));
            $grid.append('<div class="col-6 col-md-4 col-lg-3">' + buildTile(image, index) + '</div>');
        });

        if ($videoGrid.length) {
            journeyVideos.forEach(function (video) {
                $videoGrid.append(buildVideoCard(video));
            });
        }

        // Slider: sirf 4 images ek baar me dikhengi (desktop par).
        $slider.owlCarousel({
            loop: journeyImages.length > 4,
            margin: 16,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3500,
            smartSpeed: 800,
            navText: [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ],
            responsive: {
                0: { items: 1 },
                576: { items: 2 },
                992: { items: 3 },
                1200: { items: 4 }
            }
        });
    }

    $(document).ready(renderJourney);

    // Gallery modal band hote hi saari videos pause ho jaayengi.
    $(document).on("hidden.bs.modal", "#journeyGalleryModal", function () {
        $(this).find("video").each(function () {
            this.pause();
        });
    });

})(jQuery);
