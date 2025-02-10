
from secrets import choice
from django.db import models
import time
import datetime

# 格式化成2016-03-20形式
current_time = (datetime.datetime.utcnow() - datetime.timedelta(hours=4)).strftime("%Y-%m-%d") 
# Create your models here.
class Todolist(models.Model):
    job = models.CharField(verbose_name = '任务名', max_length=64)
    add_time = models.DateField(verbose_name= '添加时间', blank = True, null=True)
    ddl = models.DateTimeField(verbose_name='DDL', blank = True, null=True)
    status_choices = (
        (0, 'to do'),
        (1, 'finished')
    )
    status = models.SmallIntegerField(verbose_name='状态', choices=status_choices, default = 0)
    reoccur_choices = (
        (0, 'not reoccur'),
        (1, 'reoccur')
    )
    count = models.IntegerField(default=1)

class TimeRecords(models.Model):
    record = models.ForeignKey(Todolist, on_delete=models.SET_NULL,null=True, verbose_name='任务名', related_name='records')
    focus_time = models.IntegerField(verbose_name='专注时间', blank = True, null=True)
    occur_time = models.DateField(verbose_name='发生时间', blank = True, null=True, default=current_time)
    


    