Ansible Play Strapi
===================

## **About:** 
Playbooks and roles to deploy the headless CMS Strapi (strapi.io) on Amazon AWS.
For a detailed tutorial have a look at my Medium.com story [Using Ansible For Automatic Deployment Of A Strapi CMS To Amazon AWS](https://medium.com/p/4ac3e7dc8d4d/edit)

This Ansible play include roles for:
 - VPC
 - RDS (PostgreSQL)
 - EC2
 - S3
 - Strapi

## **Details:**
This play spins up a VPC and create private and public subnets. On RDS a database instance gets created. This instance will be placed into a subnet group of three private subnets allowing failover switches into another region in case of data center fail-outs. An EC2 instance gets created where Strapi will be installed and placed in a public subnet. This public subnet will be accessible from the internet. Because the database must only be accessible from the EC2 instance and not from the outside world it is good practice to have it decoupled from the internet.

![alt text](https://cdn-images-1.medium.com/max/800/1*BDKeLYJZAktuBR3m1T0EtQ.jpeg)

## **Get Started:**

### **#1: Create An IAM User With Programatic Access**
The Ansible roles VPC, RDS, EC2, and S3 need programmatic access to your AWS account. To do so generate a new IAM User with Programatic access and attach the below policy list. You may not need the FullAccess types  - feel free to limit the corresponding rights by shrinking them down to a minimum. If the user is not needed anymore delete it or just make the security key inactive.
1. AmazonVPCFullAccess
2. AmazonRDSFullAccess
3. AmazonS3FullAccess
4. AmazonEC2FullAccess

Write down the generated Access key ID and the corresponding Secret Access key.

### **#2: Create A Key Pair**
Within EC2 management console create a pem key file and store it in a secure location. This key will allow Ansible to access the EC2 instance via ssh.


### **#3: Configure The Ansible Variables**
You may want to configure the following variables first before running the play:

1. **./ansible.cfg:** 
- Specify which inventory you want to use (development, staging, or production)
- Point to the private key file generated above

2. **./inventories/\<stage\>/group_vars/all/credentials.yml:**
- Specify the AWS credentials for the RDS database (username and password) and the generated access key and the corresponding secret. If you clone the Github repo, these variables are empty. If you then run the playbooks you will get an error saying that you have to specify these variables first.

3. **./inventories/\<stage\>/group_vars/all/main.yml:**
- Global variables for AWS which are used roles-wide like region, database settings, and S3 bucket name

4. **./roles/\<ec2|rds|s3|strapi|vpc\>/defaults/main.yml:**
Each role has its own configuration. Check this variable definition if they fit your needs and change them if needed.

### **#4: Secure Your Credentials Using Ansible-vault (optional but recommended)**
The AWS credentials access key/access secret and the RDS database username and password are stored as mentioned in ./inventories/<stage>/group_vars/all/credentials.yml. It is strongly recommended to create an Ansible vault and encrypt this file instead of having the credentials in cleartext laying around.

### **#5: Run The Play With Asking For The Vaults Password** 
```bash
./site.yml --ask-vault-pass 
```
If the whole deployment went through successfully (takes up to 10–13 minutes) open your browser and open 
**http://\<public-ip-of-your-ec2-instance\>:<configured-strapi-port\>**