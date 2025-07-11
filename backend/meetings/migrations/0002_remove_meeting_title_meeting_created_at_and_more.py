# Generated by Django 4.2.23 on 2025-07-09 19:25

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('meetings', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='meeting',
            name='title',
        ),
        migrations.AddField(
            model_name='meeting',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='meeting',
            name='description',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='meeting',
            name='name',
            field=models.CharField(default='Default Name', max_length=255),
        ),
        migrations.AlterField(
            model_name='meeting',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
        migrations.CreateModel(
            name='TimeOption',
            fields=[
                ('id', models.AutoField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('meeting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='time_options', to='meetings.meeting')),
            ],
        ),
        migrations.CreateModel(
            name='AvailabilityResponse',
            fields=[
                ('id', models.AutoField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('participant_name', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('meeting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='availability_responses', to='meetings.meeting')),
            ],
        ),
        migrations.CreateModel(
            name='AvailabilityEntry',
            fields=[
                ('id', models.AutoField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('availability_response', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='entries', to='meetings.availabilityresponse')),
                ('time_option', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='entries', to='meetings.timeoption')),
            ],
        ),
    ]
