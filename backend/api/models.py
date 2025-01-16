
from secrets import choice
from django.db import models
import time
import datetime

# 格式化成2016-03-20形式
current_time = (datetime.datetime.utcnow() - datetime.timedelta(hours=4)).strftime("%Y-%m-%d") 
# Create your models here.
class Todolist(models.Model):
    job = models.CharField(verbose_name = '任务名', max_length=32)
    add_time = models.DateField(verbose_name= '添加时间', blank = True, null=True, default=current_time)
    ddl = models.DateTimeField(verbose_name='DDL', blank = True, null=True)
    status_choices = (
        (1, 'to do'),
        (2, 'finished')
    )
    status = models.SmallIntegerField(verbose_name='状态', choices=status_choices, default = 1)
    reoccur_choices = (
        (1, 'not reoccur'),
        (2, 'reoccur')
    )
    count = models.IntegerField(default=1)

class Records(models.Model):
    record = models.ForeignKey(Todolist, on_delete=models.CASCADE, verbose_name='任务名', related_name='records')
    finish_time = models.DateTimeField(verbose_name='完成时间', blank = True, null=True)
    total_time = models.IntegerField(verbose_name='总用时', blank = True, null=True)
    count = models.IntegerField(default=1)


    