resource "aws_ecs_task_definition" "backend_task" {
  family = "backend_ello_app_family"

  // Fargate is a type of ECS that requires awsvpc network_mode
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"

  memory = "512"
  cpu    = "256"

  // Fargate requires task definitions to have an execution role ARN to support ECR images
  execution_role_arn = aws_iam_role.ecs_role.arn

  container_definitions = <<EOT
[
    {
        "name": "ello_app_container",
        "image": "361227250051.dkr.ecr.eu-west-1.amazonaws.com/ecr_ellotest_repo:latest",
        "memory": 512,
        "essential": true,
        "portMappings": [
            {
                "containerPort": 9007,
                "hostPort": 9007
            }
        ],
        "logConfiguration": {
            "logDriver": "awslogs",
            "options": {
                "awslogs-group": "ecs-logs",
                "awslogs-region": "eu-west-1",
                "awslogs-stream-prefix": "ello-app"
            }
        }
    }
]
EOT
}

resource "aws_ecs_cluster" "backend_cluster" {
  name = "backend_cluster_ello_app"
}

resource "aws_ecs_service" "backend_service" {
  name = "backend_service"

  cluster         = aws_ecs_cluster.backend_cluster.id
  task_definition = aws_ecs_task_definition.backend_task.arn

  launch_type   = "FARGATE"
  desired_count = 1

  network_configuration {
    subnets          = ["${aws_subnet.public_a.id}", "${aws_subnet.public_b.id}"]
    security_groups  = ["${aws_security_group.security_group_example_app.id}"]
    assign_public_ip = true
  }
}
