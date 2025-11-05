import boto3
import json
from botocore.response import StreamingBody
from datetime import datetime, timezone, timedelta


def json_serializer(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    if isinstance(obj, StreamingBody):
        return obj.read().decode()
    raise TypeError(f"Type {type(obj)} not serializable")

ec2 = boto3.client('ec2', region_name='us-west-1')
response = ec2.describe_instances(Filters=[
        {
            'Name': 'tag:Environment',
            'Values': [
                'Dev'
            ]
        },
        {
            'Name': 'instance-state-name',
            'Values': ['running']
        }
    ])

seven_days_ago = datetime.now(timezone.utc) - timedelta(days=1)

# Filter instances running more than 7 days: https://stackoverflow.com/questions/69272091/filtering-ec2-instances-older-than-24-hours-using-boto3-and-python
filtered_instance_ids = []
for reservation in response['Reservations']:
    for instance in reservation['Instances']:
        if instance['LaunchTime'] < seven_days_ago:
            filtered_instance_ids.append(instance['InstanceId'])

# Terminate target instances by ids 
response = ec2.terminate_instances(InstanceIds=filtered_instance_ids)

# Pretty-print JSON
print(json.dumps(response, indent=2, default=json_serializer))