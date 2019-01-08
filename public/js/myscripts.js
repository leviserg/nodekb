$(document).ready(()=>{
    $('.del-dev').on('click', (e)=>{
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url:'/device/'+id,
            success: ()=>{
                alert('Deleting Device');
                window.location.href='/';
            },
            error: (err)=>{
                console.log(err);
            }
        });
    });
    
    $('#LoginBtnId').on('click', (e)=>{
        $('#LoginModal').modal("show");
    });

});

