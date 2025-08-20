// 全屏和缩放功能实现
 document.addEventListener('DOMContentLoaded', function() {
     // 获取全屏按钮、缩放下拉框、12小时制按钮和时钟容器
     const fullscreenBtn = document.getElementById('fullscreen-btn');
     const zoomSelect = document.getElementById('zoom-select');
     const hourFormatBtn = document.getElementById('hour-format-btn');
     const clockContainer = document.querySelector('.test-clock-container');
     
     // 初始缩放级别设为中
     let scale = 1.0; // 这个值会在DOM加载后立即更新为medium
     const maxScale = 3.0;
     // 定义三个缩放级别
     const scaleLevels = {
         small: 0.8,  // 缩小
         medium: 1.0, // 默认大小
         large: 1.2   // 放大
     };
     
     // 检查浏览器是否支持全屏API
     const isFullscreenSupported = (
         document.fullscreenEnabled || 
         document.webkitFullscreenEnabled || 
         document.mozFullScreenEnabled || 
         document.msFullscreenEnabled
     );
     
     // 添加缩放功能
     // 更新缩放级别，确保背景图片不随缩放变化
     function updateZoom(newScale) {
         // 确保缩放级别不超过最大限制
         if (newScale <= maxScale) {
             scale = newScale;
             // 查找.clock-container元素
             const clockContainerElement = clockContainer.querySelector('.clock-container');
             if (clockContainerElement) {
                 // 只缩放.clock-container部分
                 clockContainerElement.style.transform = `scale(${scale})`;
             } else {
                 // 如果找不到.clock-container元素，不进行缩放
                 console.warn('.clock-container element not found, zoom skipped');
             }
         }
     }
     
     if (zoomSelect && clockContainer) {
         // 设置初始缩放级别为中
         zoomSelect.value = 'medium';
         updateZoom(scaleLevels.medium);
          
         // 添加缩放下拉框事件监听器
         zoomSelect.addEventListener('change', (e) => {
             const selectedValue = e.target.value;
             updateZoom(scaleLevels[selectedValue]);
         });
     }
     
     if (isFullscreenSupported && fullscreenBtn && clockContainer) {
         // 全屏按钮点击事件
         fullscreenBtn.addEventListener('click', toggleFullscreen);
         
         // 监听全屏状态变化
         document.addEventListener('fullscreenchange', handleFullscreenChange);
         document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
         document.addEventListener('mozfullscreenchange', handleFullscreenChange);
         document.addEventListener('MSFullscreenChange', handleFullscreenChange);
     } else if (fullscreenBtn) {
         // 不支持全屏API时，禁用按钮
         fullscreenBtn.disabled = true;
         fullscreenBtn.textContent = 'Fullscreen not supported';
     }
     
     // 切换全屏模式
     function toggleFullscreen() {
         if (!document.fullscreenElement && 
             !document.webkitFullscreenElement && 
             !document.mozFullScreenElement && 
             !document.msFullscreenElement) {
             // 进入全屏
             if (clockContainer.requestFullscreen) {
                 clockContainer.requestFullscreen();
             } else if (clockContainer.webkitRequestFullscreen) {
                 clockContainer.webkitRequestFullscreen();
             } else if (clockContainer.mozRequestFullScreen) {
                 clockContainer.mozRequestFullScreen();
             } else if (clockContainer.msRequestFullscreen) {
                 clockContainer.msRequestFullscreen();
             }
         } else {
             // 退出全屏
             if (document.exitFullscreen) {
                 document.exitFullscreen();
             } else if (document.webkitExitFullscreen) {
                 document.webkitExitFullscreen();
             } else if (document.mozCancelFullScreen) {
                 document.mozCancelFullScreen();
             } else if (document.msExitFullscreen) {
                 document.msExitFullscreen();
             }
         }
     }
     
     // 显示所有控制按钮
     function showFullscreenBtn() {
         // 清除之前的定时器
         [fullscreenBtn, zoomSelect, hourFormatBtn].forEach(btn => {
             if (btn) {
                 clearTimeout(btn.hideTimer);
             }
         });
         
         // 显示按钮和下拉框
         [fullscreenBtn, zoomSelect, hourFormatBtn].forEach(btn => {
             if (btn) {
                 btn.style.opacity = '1';
             }
         });
         
         // 设置定时器，3秒后隐藏按钮
         [fullscreenBtn, zoomSelect, hourFormatBtn].forEach(btn => {
             if (btn) {
                 btn.hideTimer = setTimeout(hideFullscreenBtn, 3000);
             }
         });
     }
     
     // 隐藏所有控制按钮
     function hideFullscreenBtn() {
         [fullscreenBtn, zoomSelect, hourFormatBtn].forEach(btn => {
             if (btn) {
                 btn.style.opacity = '0';
             }
         });
     }
     
     // 处理全屏状态变化
     function handleFullscreenChange() {
         const isFullscreen = !!(document.fullscreenElement || 
             document.webkitFullscreenElement || 
             document.mozFullScreenElement || 
             document.msFullscreenElement);
         
         if (isFullscreen) {
             // 保存当前缩放级别
             clockContainer._originalScale = scale;
              
             // 全屏模式下保持当前缩放级别
             updateZoom(scale);
             // 进入全屏
             document.body.classList.add('fullscreen');
             fullscreenBtn.textContent = 'Full Screen';
             
             // 获取全屏元素 (top-layer)
             const fullscreenElement = document.fullscreenElement || 
                 document.webkitFullscreenElement || 
                 document.mozFullScreenElement || 
                 document.msFullscreenElement;
             
             // 保存按钮的原始父容器
             const originalParent = fullscreenBtn.parentNode;
             
             // 将按钮和下拉框添加到 top-layer 元素
             [hourFormatBtn, fullscreenBtn, zoomSelect].forEach(btn => {
                 if (btn && fullscreenElement && btn.parentNode !== fullscreenElement) {
                     // 保存按钮的原始位置和样式
                     btn._originalParent = btn.parentNode;
                     btn._originalNextSibling = btn.nextSibling;
                     btn._originalStyle = btn.getAttribute('style') || '';
                     
                     // 将按钮添加到全屏元素
                     fullscreenElement.appendChild(btn);
                 }
             });
             
             // 默认隐藏按钮和下拉框
             [hourFormatBtn, fullscreenBtn, zoomSelect].forEach(btn => {
                 if (btn) {
                     btn.style.opacity = '0';
                     btn.style.zIndex = '2000';
                     btn.style.position = 'fixed';
                     btn.style.transition = 'opacity 0.3s ease';
                 }
             });
             
             // 设置按钮和下拉框位置
             if (hourFormatBtn) {
                 hourFormatBtn.style.top = '20px';
                 hourFormatBtn.style.right = '240px';
                 hourFormatBtn.style.marginRight = '10px';
             }
             if (fullscreenBtn) {
                 fullscreenBtn.style.top = '20px';
                 fullscreenBtn.style.right = '120px';
                 fullscreenBtn.style.marginRight = '10px';
             }
             if (zoomSelect) {
                 zoomSelect.style.top = '20px';
                 zoomSelect.style.right = '20px';
             }
             
             // 添加鼠标移动事件监听器
             document.addEventListener('mousemove', showFullscreenBtn);
         } else {
                 // 退出全屏
                 document.body.classList.remove('fullscreen');
                 fullscreenBtn.textContent = 'Full Screen';
                 
                 // 恢复原始缩放级别
                 if (clockContainer._originalScale !== undefined) {
                     updateZoom(clockContainer._originalScale);
                     delete clockContainer._originalScale;
                 }
              
             // 移除鼠标移动事件监听器
             document.removeEventListener('mousemove', showFullscreenBtn);
             
             // 清除所有按钮的定时器
             [hourFormatBtn, fullscreenBtn, zoomSelect].forEach(btn => {
                 if (btn) {
                     clearTimeout(btn.hideTimer);
                 }
             });
             
             // 按原始顺序将按钮移回原始位置并恢复原始样式
             [hourFormatBtn, fullscreenBtn, zoomSelect].forEach(btn => {
                 if (btn && btn._originalParent) {
                     // 恢复原始样式
                     if (btn._originalStyle !== undefined) {
                         btn.setAttribute('style', btn._originalStyle);
                         delete btn._originalStyle;
                     } else {
                         // 如果没有保存原始样式，清除所有内联样式
                         btn.removeAttribute('style');
                     }
                     
                     // 移回原始位置
                     if (btn._originalNextSibling) {
                         btn._originalParent.insertBefore(btn, btn._originalNextSibling);
                     } else {
                         btn._originalParent.appendChild(btn);
                     }
                     
                     // 清除保存的引用
                     delete btn._originalParent;
                     delete btn._originalNextSibling;
                 }
             });
         }
     }
 });