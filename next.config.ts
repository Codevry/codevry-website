import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    turbopack: {
        rules: {
            // Define how Turbopack should handle .svg files
            "*.svg": {
                loaders: [
                    {
                        loader: "@svgr/webpack",
                        options: {
                            icon: true,
                            // You can add SVGR options here. For example:
                            // icon: true, // Treat SVG as an icon component
                            // svgoConfig: {
                            //   plugins: [
                            //     {
                            //       name: 'preset-default',
                            //       params: {
                            //         overrides: {
                            //           removeViewBox: false,
                            //         },
                            //       },
                            //     },
                            //     'removeDimensions',
                            //   ],
                            // },
                        },
                    },
                ],
                // Important: Tell Turbopack to treat the output as a JavaScript module
                as: "*.js",
            },
        },
    },
};

export default nextConfig;
