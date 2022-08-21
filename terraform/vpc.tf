provider "aws" {
  region     = "ap-south-1"
  access_key = var.access_key
  secret_key = var.secret_key
}

# resource "aws_vpc" "mernude-vpc" {
#   cidr_block = var.vpc_cidr_block
#   tags = {Name="mernude-vpc"}
# }


data "aws_availability_zones" "available" {}

module "mernude-vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.14.2"

  name = "mernude-vpc"
  cidr = var.vpc_cidr_block

  private_subnets = var.private_subnets
  public_subnets  = var.public_subnets

  azs = data.aws_availability_zones.available.names
  # azs = module.mernude-vpc.azs-op

  enable_nat_gateway   = true
  single_nat_gateway   = true
  # enable_dns_hostnames = true

  # default_route_table_routes=[]

  tags = {
    # terraform="true"
    # Environment = "dev"
  }
  public_subnet_tags = {
    name = "ares"
  }

}
# output "azs-op" {
#   #  value = data.aws_availability_zones.available.names
#   value = module.mernude-vpc.azs
# }

# output "igw" {
#   value = module.mernude-vpc.igw_id
# }