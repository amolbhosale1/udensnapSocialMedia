data "aws_ami" "latest-ami" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["amzn2-ami-kernel-*-x86_64-gp2"]
  }
  # filter {
  #   name="Platform"
  #   values=["amazon"]
  # }
}
data "aws_security_groups" "sgID" {
  filter {
    name   = "vpc-id"
    values = [module.mernude-vpc.vpc_id]
  }
}

resource "aws_key_pair" "ssh-key" {
  key_name   = "local-git-ssh-key"
  public_key = file(var.ssh-key-loc)
}

module "ec2-instance" {
  source  = "terraform-aws-modules/ec2-instance/aws"
  version = "4.1.1"

  ami                    = data.aws_ami.latest-ami.id
  instance_type          = var.instance_type
  subnet_id              = module.mernude-vpc.public_subnets[0]
  vpc_security_group_ids = data.aws_security_groups.sgID.ids
  key_name               = aws_key_pair.ssh-key.key_name
  
  # count = 2
  name = "mern-ude"
}

# output "amis" {
#   value = module.mernude-vpc.public_subnets
# }
# output "sgs" {
#   value = data.aws_security_groups.sgID.ids
# }

resource "null_resource" "ansible_config_and_run" {
  triggers = {
    trigger= module. ec2-instance.public_ip
  }
  provisioner "local-exec" {
    working_dir = "../ansible"
    command = "ansible-playbook --inventory ${module.ec2-instance.public_ip}, --private-key ${var.private-ssh-key-loc} --user ec2-user install-docker-python3.yaml"
  
  }
}

# output "null_res" {
#   value = null_resource.ansible_config_and_run
# }
