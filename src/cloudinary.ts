import { v2 as cloudinary } from 'cloudinary';
import { api_key, api_secret, cloud_name } from './conf';

const Cloudinary = cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret // Click 'View Credentials' below to copy your API secret
});

export default Cloudinary;