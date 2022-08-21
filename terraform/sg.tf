# module myip {
#   source  = "4ops/myip/http"
#   version = "1.0.0"
# }
module "security-group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "4.10.0"

  name              = "mern-ude"
  vpc_id            = module.mernude-vpc.vpc_id
  security_group_id = module.mernude-vpc.default_security_group_id

  ingress_with_cidr_blocks = [
    {
      from_port   = 8080
      to_port     = 8080
      protocol    = "tcp"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = var.my_ip
    }
  ]
  egress_with_cidr_blocks = [{
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = "0.0.0.0/0"
    prefix_list_ids = ""

  }]

}
