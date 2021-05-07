# Ansible Role Strapi

## Brief description:
This role installs Node.Js on an EC2 instance, creates a strapi application on it and configures PM2 runtime so that strapi gets automatically started on each system start.

Strapi itself gets configured with a hidden .env file which is a Jinja2 template. Further more the AWS S3 upload provider plugin gets installed.