# Ansible Role RDS

## Brief description:
This role creates an AWS RDS instance with a PostgreSQL database. The RDS instance gets a database subnet group with three private subnets assigned.
A security group gets created which configures that only the EC2 instance can communicate with this database.