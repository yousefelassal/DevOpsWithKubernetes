# log_output

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.19. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

# k8s with k3d
To create a local Kubernetes cluster using k3d:

```bash
k3d cluster create -a 2
```

this will create a cluster with 2 worker nodes. You can check the cluster status with:

```bash
k3d cluster list
```

To build the Docker image and load it into the k3d cluster:

```bash
docker build -t log-output .
k3d image import log-output -c <cluster-name>
```

To create the deployment and save the deployment manifest:

```bash
kubectl create deployment log-output --image=log-output --dry-run=client -o yaml > deployment.yaml
```

To apply the deployment:

```bash
kubectl apply -f deployment.yaml
```

To get the logs of the deployment:

```bash
kubectl logs -l app=log-output -f
```

To clean up the cluster:

```bash
k3d cluster delete <cluster-name>
```

To get the pods:

```bash
kubectl get pods
```

To port forward the deployment to access it locally:

```bash
kubectl port-forward <pod-name> 3003:3000

Forwarding from 127.0.0.1:3003 -> 3000
Forwarding from [::1]:3003 -> 3000
```

Then you can access the application at http://localhost:3003.