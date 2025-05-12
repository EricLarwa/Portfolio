/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // Add the file loader for PDFs
        config.module.rules.push({
          test: /\.pdf$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/_next/static/files',
              outputPath: 'static/files',
            },
          },
        });
    
        return config;
      },
};

export default nextConfig;
