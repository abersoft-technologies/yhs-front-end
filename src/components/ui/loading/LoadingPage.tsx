import React from 'react';
import { Flex } from '../Flex';

const LoadingPage = () => {
  return (
    <main className='loading-page-container'>
      <Flex direction='column' align='center' gap='xxx-large'>
        <svg
          width='208'
          height='148'
          viewBox='0 0 208 148'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.42578 138H13.6914V125.695L22.6943 108.1H17.8955L11.5586 121.368L5.22168 108.1H0.422852L9.42578 125.695V138ZM41.582 138H46.1143V108.1H41.582V120.917H29.749V108.1H25.2168V138H29.749V124.937H41.582V138ZM67.0732 112.386H73.6152C74.8457 112.358 75.9258 112.639 76.8555 113.227C77.4707 113.582 77.9492 114.067 78.291 114.683C78.6191 115.366 78.7832 116.207 78.7832 117.205C78.7832 118.408 78.3799 119.502 77.5732 120.486C76.7256 121.498 75.4609 122.018 73.7793 122.045H67.0732V112.386ZM62.541 138H67.0732V126.331H73.9639C77.04 126.276 79.3779 125.292 80.9775 123.378C82.5361 121.56 83.3154 119.543 83.3154 117.328C83.3154 115.688 83.0078 114.266 82.3926 113.062C81.8047 111.818 81.0391 110.861 80.0957 110.191C78.9746 109.303 77.8672 108.715 76.7734 108.428C75.6797 108.209 74.5449 108.1 73.3691 108.1H62.541V138ZM85.2227 127.336C85.2227 129.578 85.4072 131.287 85.7764 132.463C86.1592 133.639 86.7471 134.657 87.54 135.519C88.1279 136.188 88.9482 136.79 90.001 137.323C91.04 137.911 92.373 138.219 94 138.246C95.6816 138.219 97.042 137.911 98.0811 137.323C98.6416 137.077 99.0996 136.783 99.4551 136.441C99.8516 136.141 100.187 135.833 100.46 135.519C101.308 134.657 101.909 133.639 102.265 132.463C102.606 131.287 102.777 129.578 102.777 127.336C102.777 125.094 102.606 123.371 102.265 122.168C101.909 120.992 101.308 120.001 100.46 119.194C99.8994 118.483 99.1064 117.848 98.0811 117.287C97.042 116.754 95.6816 116.474 94 116.446C92.373 116.474 91.04 116.754 90.001 117.287C88.9482 117.848 88.1279 118.483 87.54 119.194C86.7471 120.001 86.1592 120.992 85.7764 122.168C85.4072 123.371 85.2227 125.094 85.2227 127.336ZM98.4912 127.377C98.4912 128.826 98.4229 129.893 98.2861 130.576C98.1494 131.273 97.8691 131.889 97.4453 132.422C97.1309 132.832 96.666 133.194 96.0508 133.509C95.4629 133.81 94.7793 133.96 94 133.96C93.2754 133.96 92.6055 133.81 91.9902 133.509C91.4023 133.194 90.9238 132.832 90.5547 132.422C90.1855 131.889 89.9189 131.273 89.7549 130.576C89.5908 129.893 89.5088 128.812 89.5088 127.336C89.5088 125.846 89.5908 124.752 89.7549 124.055C89.9189 123.385 90.1855 122.797 90.5547 122.291C90.9238 121.812 91.4023 121.437 91.9902 121.163C92.6055 120.876 93.2754 120.732 94 120.732C94.7793 120.732 95.4629 120.876 96.0508 121.163C96.666 121.437 97.1309 121.812 97.4453 122.291C97.8691 122.797 98.1494 123.385 98.2861 124.055C98.4229 124.752 98.4912 125.859 98.4912 127.377ZM107.269 138H111.555V125.183C111.582 123.624 112.033 122.496 112.908 121.799C113.688 121.088 114.624 120.732 115.718 120.732C116.688 120.732 117.625 121.088 118.527 121.799L121.645 118.087C120.373 117.021 118.883 116.474 117.174 116.446C114.891 116.446 113.045 117.287 111.637 118.969H111.555V116.713H107.269V138ZM123.88 116.713H121.747V119.974H123.88V132.75C123.88 134.432 124.372 135.717 125.356 136.605C126.313 137.535 127.544 138 129.048 138H131.283V133.96H129.684C128.645 133.987 128.139 133.461 128.166 132.381V119.974H131.283V116.713H128.166V110.232H123.88V116.713ZM146.5 138H150.786V123.46C150.759 120.862 149.945 119.03 148.346 117.964C146.746 116.925 144.606 116.419 141.927 116.446C138.755 116.392 136.355 117.431 134.729 119.563L138.092 122.127C138.461 121.512 138.967 121.074 139.609 120.814C140.225 120.596 141.065 120.486 142.132 120.486C145.071 120.432 146.527 121.341 146.5 123.214V125.449H140.573C138.304 125.477 136.581 126.092 135.405 127.295C134.229 128.471 133.642 129.954 133.642 131.745C133.642 133.618 134.318 135.156 135.672 136.359C136.957 137.59 138.789 138.219 141.168 138.246C142.617 138.246 143.752 138.068 144.572 137.713C145.406 137.371 146.021 136.838 146.418 136.113H146.5V138ZM146.5 130.515C146.5 132.114 146.165 133.14 145.495 133.591C144.757 134.042 143.492 134.254 141.701 134.227C140.279 134.227 139.261 133.946 138.646 133.386C138.003 132.88 137.682 132.265 137.682 131.54C137.654 129.886 138.885 129.031 141.373 128.977H146.5V130.515ZM156.323 132.832C156.323 134.705 156.856 136.038 157.923 136.831C158.935 137.61 160.22 138 161.778 138H163.686V133.96H162.209C161.143 133.96 160.609 133.475 160.609 132.504V108.1H156.323V132.832ZM183.66 128.977V125.449C183.633 122.646 182.765 120.445 181.056 118.846C179.374 117.273 177.316 116.474 174.883 116.446C173.871 116.446 172.846 116.631 171.807 117C170.754 117.369 169.804 117.971 168.956 118.805C168.122 119.625 167.438 120.746 166.905 122.168C166.372 123.562 166.105 125.312 166.105 127.418C166.105 129.605 166.413 131.383 167.028 132.75C167.589 134.172 168.32 135.279 169.223 136.072C169.688 136.455 170.187 136.776 170.72 137.036C171.226 137.337 171.745 137.576 172.278 137.754C173.345 138.082 174.438 138.246 175.56 138.246C178.499 138.273 181.056 137.125 183.229 134.801L180.133 132.155C178.766 133.536 177.214 134.227 175.478 134.227C173.987 134.227 172.784 133.775 171.868 132.873C170.884 131.984 170.392 130.686 170.392 128.977H183.66ZM170.392 125.449C170.474 123.795 170.918 122.544 171.725 121.696C172.545 120.89 173.598 120.486 174.883 120.486C176.168 120.486 177.221 120.89 178.041 121.696C178.875 122.544 179.319 123.795 179.374 125.449H170.392ZM188.151 138H192.438V125.326C192.438 123.836 192.841 122.701 193.647 121.922C194.44 121.129 195.452 120.732 196.683 120.732C197.913 120.732 198.918 121.129 199.697 121.922C200.49 122.701 200.887 123.836 200.887 125.326V138H205.173V123.85C205.104 121.416 204.346 119.57 202.896 118.312C201.434 117.068 199.82 116.446 198.057 116.446C195.773 116.446 193.928 117.287 192.52 118.969H192.438V116.713H188.151V138Z'
            fill='white'
          />
          <path
            d='M77.8 64.5249V49.6842L95.6356 59.9236C98.333 61.4727 101.389 62.2879 104.5 62.2879C107.611 62.2879 110.667 61.4727 113.364 59.9236L131.2 49.6886V64.5249C131.2 64.8173 131.143 65.1069 131.032 65.3772C130.92 65.6475 130.757 65.8932 130.55 66.1002L130.541 66.1047L130.532 66.118L130.501 66.1447L130.399 66.2426L130.043 66.5719C129.608 66.9536 129.161 67.3216 128.704 67.6755C127.105 68.9028 125.407 69.9939 123.626 70.9374C117.737 74.0614 111.167 75.6818 104.5 75.6544C97.8333 75.6818 91.2632 74.0614 85.3739 70.9374C83.5947 69.9937 81.8977 68.9026 80.3009 67.6755C79.7136 67.2228 79.1465 66.7447 78.601 66.2426L78.4986 66.1447C78.2805 65.9346 78.1064 65.6831 77.9865 65.405C77.8666 65.1269 77.8031 64.8278 77.8 64.5249V64.5249ZM143.433 37.5312L111.148 56.0655C109.125 57.2273 106.833 57.8386 104.5 57.8386C102.167 57.8386 99.8747 57.2273 97.8517 56.0655L68.9 39.4447V60.0749C68.9 60.665 68.6655 61.231 68.2483 61.6482C67.831 62.0655 67.2651 62.2999 66.675 62.2999C66.0848 62.2999 65.5189 62.0655 65.1016 61.6482C64.6844 61.231 64.45 60.665 64.45 60.0749V35.5999C64.4497 35.1988 64.558 34.805 64.7632 34.4603C64.9684 34.1156 65.2631 33.8329 65.6159 33.6419L97.8517 15.1344C99.8743 13.9713 102.167 13.3591 104.5 13.3591C106.833 13.3591 109.126 13.9713 111.148 15.1344L143.433 33.6731C143.772 33.8681 144.054 34.1491 144.25 34.4878C144.446 34.8264 144.549 35.2108 144.549 35.6021C144.549 35.9934 144.446 36.3778 144.25 36.7165C144.054 37.0552 143.772 37.3362 143.433 37.5312V37.5312Z'
            fill='#7586CE'
          />
        </svg>
        <div className='loading-wheel-page'></div>
      </Flex>
    </main>
  );
};

export default LoadingPage;
